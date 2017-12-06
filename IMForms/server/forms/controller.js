const Form = require('./model')
const User = require('../users/model')
const jwt = require('jsonwebtoken')
const filledForms = require('./filledModel')

module.exports.getForm = function(req, res) {
    var decoded = jwt.decode(req.headers.token, {
        complete: true
    })
    var userId = decoded.payload.userId;
    User.findOne({
        '_id': userId
    }, function(err, user) {
        if (err) {
            res.send({
                'status': 'error',
                'data': 'User not found'
            })
            return;
        }
        if (req.query.id) {
            Form.find({
                'formID': req.query.id
            }, function(err, data) {
                if (err) {
                    res.send({
                        'status': 'error',
                        'data': 'Form not found.'
                    })
                    return;
                }
                let result = {}
                result.title = data[0].title
                result.description = data[0].description
                if ('publishId' in data) {
                    result.publishId = data[0].publishId
                }
                res.send(result);
            })
        }
        if (req.query.publishId) {
            Form.find({
                'publishId': req.query.publishId
            }, function(err, data) {
                if (err) {
                    res.send({
                        'status': 'error',
                        'data': 'Form not found.'
                    })
                    return;
                }
                res.send(data);
            })
        }
    })
}

module.exports.addForm = function(req, res) {
    let form = new Form();
    form.title = req.body.title;
    form.description = req.body.description;
    form.formID = req.body.id;
    if (req.body.publishId) {
        form.publishId = req.body.publishId;
    }

    let decoded = jwt.decode(req.headers.token, {
        complete: true
    })
    let userId = decoded.payload.userId;
    User.findOne({
        '_id': userId
    }, function(err, user) {
        if (err) {
            res.send({
                'status': 'error',
                'data': 'User not found'
            })
            return;
        }
        user.forms.push({
            'formID': form.formID,
            'owner': true,
            'published': false
        })
        user.save();
        form.save(function(err) {
            if (err) {
                res.send({
                    'status': 'error',
                    'data': 'Unable to save form.'
                })
                return;
            }
        })
        res.send({
            'status': 'added'
        })
    })
}

module.exports.deleteForm = function(req, res) {
    var decoded = jwt.decode(req.headers.token, {
        complete: true
    })
    var userId = decoded.payload.userId;

    User.findOne({
        '_id': userId
    }, function(err, user) {
        if (err) {
            res.send({
                'status': 'error',
                'data': 'User not found'
            })
            return;
        }
        var index = user.forms.indexOf(req.params.id);
        user.forms.splice(index, 1);
        user.save();

        User.findOne({
            'forms': {
                $elemMatch: {
                    formID: req.params.id
                }
            }
        }, function(err, user) {
            if (err) {
                res.send({
                    'status': 'error',
                    'data': 'form deleted not correctly'
                })
                return;
            }

            if (!user) {
                Form.findOne({
                    'formID': req.params.id
                }, function(err, form) {
                    if (err) {
                        res.send({
                            'status': 'error',
                            'data': 'Unable to delete form.'
                        })
                        return;
                    }
                    res.send({
                        'status': 'deleted'
                    })
                    form.remove();
                })
            }
        })
    })
}

module.exports.updateForm = function(req, res) {
    let form = new Form();
    form.title = req.body.title;
    form.description = req.body.description;
    if (req.body.publishId) {
        form.publishId = req.body.publishId
    }
    var decoded = jwt.decode(req.headers.token, {
        complete: true
    })
    var userId = decoded.payload.userId;
    if (req.body.publishId) {
        User.update({
            "_id": userId,
            "forms": { $elemMatch: { 'formID': req.params.id } }
        }, {
            $set: { "forms.$.published": true }
        }, function(err, doc) {
            if (err) {
                res.send({
                    'status': 'error',
                    'data': 'Form not found'
                });
                return;
            }
        });
    }

    Form.findOneAndUpdate({ 'formID': req.params.id }, req.body, function(err, place) {
        if (err) {
            res.send({
                'status': 'error',
                'data': 'Form not found'
            });
        }
        res.send(place);
    });
}

module.exports.getFormsForUser = function(req, res) {
    res.send({
        'Status': 'getFormForUser working'
    })
}
module.exports.deleteFilledForms = function(req, res) {
    res.send({
        'Status': 'deleteFilledForms working'
    })
}
module.exports.deleteFilledRowsForAForm = function(req, res) {
    res.send({
        'Status': 'deleteFilledRowsForAForm working'
    })
}
module.exports.shareFormWithUsers = function(req, res) {
    res.send({
        'Status': 'shareFormWithUsers working'
    })
}

module.exports.getAllForms = function(req, res) {
    var decoded = jwt.decode(req.headers.token, {
        complete: true
    });
    var userID = decoded.payload.userId;
    let published = [];
    let shared = [];
    let sync = false;
    User.findOne({
        '_id': userID
    }, function(err, user) {
        if (err) {
            res.send("error");
            return;
        }
        if (user) {
            for (let i = 0; i < user.forms.length; i++) {
                let j = 1;
                sync = true;
                let key = "element" + j;
                let data = [];
                let columns = [];
                let dataObject = {};
                Form.findOne({ formID: user.forms[i].formID }, function(err, form) {
                    if (form) {
                        while (form.description[key] !== undefined) {
                            for (var key1 in form.description[key].data.config) {
                                columns.push(form.description[key].data.config[key1].label);
                            }
                            ++j;
                            key = "element" + j;
                        }
                        for (let i = 0; i < columns.length; ++i) {
                            dataObject[columns[i]] = "";
                        }
                        data.push(dataObject);
                        if (user.forms[i].owner === true) {
                            if (form && undefined !== form.publishId) {
                                published.push({ "id": user.forms[i].formID, "owner": "me", "name": form.title, "publishId": form.publishId, "data": data });
                            }
                        } else if (user.forms[i].owner === false) {
                            if (form) {
                                shared.push({ "id": user.forms[i].formID, "name": form.title, "publishId": form.publishId, "data": data });
                            }
                        }
                        if (user.forms.length - 1 == i) {
                            sync = false;
                        }
                    }
                })
            }
            while (sync) { require('deasync').sleep(100); }
            res.send({ "published": published, "shared": shared });
        }
    });
}

module.exports.getSavedForms = function(req, res) {
    var decoded = jwt.decode(req.headers.token, {
        complete: true
    });
    var userID = decoded.payload.userId;
    let saved = [];
    let sync = false;
    User.findOne({
        '_id': userID
    }, function(err, user) {
        if (err) {
            res.send("erroe");
            return;
        }
        if (user) {
            for (let i = 0; i < user.forms.length; i++) {
                sync = true;
                Form.findOne({ formID: user.forms[i].formID }, function(err, form) {
                    if (user.forms[i].owner === true) {
                        if (form && undefined == form.publishId) {
                            saved.push({ "id": user.forms[i].formID, "title": form.title, "description": form.description });
                        }
                    }
                    if (user.forms.length - 1 == i) {
                        sync = false;
                    }
                })
            }
            while (sync) { require('deasync').sleep(100); }
            res.send({ "saved": saved });
        }
    });
}

module.exports.getFilledForm = function(req, res) {
    console.log(req.params.formId);
    Form.findOne({
        'formID': req.params.formId
    }, function(err, form) {
        if (err) {
            res.status(400).send(err);
        }
        if (form) {
            let publishId = form.publishId;
            filledForms.find({
                formId: req.params.formId
            }, function(err, fillData) {
                if (err) {
                    res.status(400).send(err);
                }
                if (fillData.length === 0) {
                    res.send({ "fillData": fillData, "publishId": publishId });
                } else {
                    let array = [];
                    for (let i = 0; i < fillData.length; ++i) {
                        array.push(fillData[i].data);
                    }
                    res.send({ "fillData": array, "publishId": publishId });

                }
            });
        }
    });
}

module.exports.addFilledForm = function(req, res) {
    var filledForm = new filledForms({
        formId: req.body.formId,
        title: req.body.title,
        data: req.body.data
    });
    filledForm.save(function(err) {
        if (err) {
            res.status(400).send({
                status: 'error',
            })
        } else {
            res.send({
                status: 'success'
            })
        }
    });
}

module.exports.uploadImage = function(req, res) {
    console.log(req.body);
    res.send({
        status: "success"
    });
}

module.exports.unPublishedForm = function(req, res) {
    Form.findOne({ formID: req.params.id }, function(err, form) {
        if (err) {
            res.send({ "status": "error" });
        }
        if (form) {
            form.publishId = req.body.publishId;
            form.save();
            res.send({ "Status": "OK" });
        }
    });

}