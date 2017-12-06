import { Validators } from '@angular/forms';

export const Elements: any[] = [
    {
        name: 'Full Name',
        icon: 'glyphicon glyphicon-user',
        data:
        {
            config: {
                firstName: {
                    label: 'First Name',
                    validation: [Validators.required]
                },
                lastName: {
                    label: 'Last Name',
                    validation: [Validators.required]
                }
            }
        }
    },
    {
        name: 'Email',
        icon: 'glyphicon glyphicon-envelope',
        data:
        {
            config: {
                email: {
                    label: 'Email',
                    validation: [Validators.required]
                }
            }
        }
    },
    {
        name: 'Address',
        icon: 'glyphicon glyphicon-home',
        data:
        {
            config: {
                country: {
                    label: 'Country',
                    validation: [Validators.required]
                },
                city: {
                    label: 'City / Village',
                    validation: [Validators.required]
                },
                address: {
                    label: 'Address',
                    validation: [Validators.required]
                }
            }
        }
    },
    {
        name: 'Phone',
        icon: 'glyphicon glyphicon-phone',
        data:
        {
            config: {
                phone: {
                    label: 'Phone',
                    validation: [Validators.required]
                }
            }
        }
    },
    {
        name: 'Education',
        icon: 'glyphicon glyphicon-education',
        data:
        {
            years: 'Education years',
            config: {
                education: {
                    label: 'Education',
                    validation: [Validators.required]
                },
                educountry: {
                    label: 'Country',
                    validation: [Validators.required]
                },
                educity: {
                    label: 'City',
                    validation: [Validators.required]
                },
                university: {
                    label: 'University',
                    validation: [Validators.required]
                },
                faculty: {
                    label: 'Faculty',
                    validation: [Validators.required]
                },
                edustart: {
                    label: 'Start',
                    validation: [Validators.required]
                },
                eduend: {
                    label: 'End',
                    validation: [Validators.required]
                },
                degree: {
                    label: 'Degree',
                    validation: [Validators.required],
                }
            }
        }
    },
    {
        name: 'Skills',
        icon: 'glyphicon glyphicon-sunglasses',
        data:
        {
            skills: 'Skills',
            skill: 'Skill',
            config: {
                name: {
                    label: 'Skill name',
                    validation: [Validators.required]
                },
                range: {
                    label: 'Knowledge',
                    validation: [Validators.required]
                }
            }
        }
    },
    {
        name: 'Birthday',
        icon: 'glyphicon glyphicon-gift',
        data:
        {
            config: {
                birthday: {
                    label: 'Birthday',
                    validation: [Validators.required]
                }
            }
        }
    },
    {
        name: 'Family Status',
        icon: 'fa fa-child',
        data:
        {
            config: {
                status: {
                    label: 'Family Status'
                }
            }
        }
    },
    {
        name: 'Image',
        icon: 'glyphicon glyphicon-picture',
        data:
        {
            config: {
                image: {
                    label: 'Image',
                    validation: [Validators.required]
                }
            },
            message: 'Upload your Image'
        }
    },
    {
        name: 'Exams',
        icon: 'glyphicon glyphicon-time',
        data:
        {
            config: {
                firstDay: {
                    label: 'Preffered days: Start date',
                    validation: [Validators.required]
                },
                lastDay: {
                    label: 'End date',
                    validation: [Validators.required]
                },
                firstTime: {
                    label: 'Preffered times: Start Time',
                    validation: [Validators.required]
                },
                lastTime: {
                    label: 'End Time',
                    validation: [Validators.required]
                }
            }
        }
    },
    {
        name: 'Work Experience',
        icon: 'glyphicon glyphicon-briefcase',
        data:
        {
            work: 'Work experience',
            years: 'Work years',
            config: {
                place: {
                    label: 'Place',
                    validation: [Validators.required]
                },
                speciality: {
                    label: 'Speciality',
                    validation: [Validators.required]
                },
                start: {
                    label: 'Start',
                    validation: [Validators.required]
                },
                end: {
                    label: 'End',
                    validation: [Validators.required]
                }
            }
        }
    }
]
