import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
declare let jsPDF;

@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html',
    styleUrls: ['./cv.component.less']
})
export class CvComponent implements OnInit, AfterViewChecked {
    public labels: any = {};
    public skill = [];
    public image: any;
    @ViewChild('source') source: ElementRef;
    @ViewChild('right') right: ElementRef;
    @ViewChild('left') left: ElementRef;
    @ViewChild('down') down: ElementRef;

    constructor(@Inject(MD_DIALOG_DATA) public data: any, private cdRef: ChangeDetectorRef) {
        Object.keys(this.data.title.description).forEach(
            item => {
                for (const key of  Object.keys(this.data.title.description[item].data.config)) {
                    if (!(this.data.title.description[item].data.config[key].label in this.labels)) {
                        this.labels[key] = [];
                    }
                    this.labels[key].push(this.data.title.description[item].data.config[key].label);
                }
            }

        );
        if (this.data.content && this.labels.image) {
            this.image = this.data.content[this.labels.image];
            console.log(this.image);
        }
        this.skill = ['Beginner', 'Familiar', 'Proficient', 'Expert', 'Master'];
    }
    public download() {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        let name;
        if (this.labels.firstName) {
            doc.setFontSize(16);
            doc.setFontType('bold');
            name = this.data.content[this.labels.firstName] + ' ' + this.data.content[this.labels.lastName];
            const xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(name) * 4);
            doc.text(name, xOffset, 10);
        }
        let imgSize = 0;
        if (this.labels.image) {
            imgSize = 40;
            doc.addImage(this.image, 15, 15, imgSize, imgSize);
        }

        let invalid = [];
        invalid = invalid.concat(this.labels.image, this.labels.firstName, this.labels.lastName);
        const keys = Object.keys(this.data.content).filter( key => {
            return invalid.indexOf(key) === -1;
        });
        let position = 100;
        let marginTop = 20;
        const fontsize = 12;
        for (let i = 0; i < keys.length; ++i) {
            if (this.data.content[keys[i]]) {
                if (Array.isArray(this.data.content[keys[i]])) {
                    doc.setFontSize(14);
                    doc.setFontType('bolditalic');
                    marginTop += 10;
                    const key = keys[i].split('Component');
                    doc.text(20 + imgSize, marginTop , key);
                    doc.setFontSize(fontsize);
                    doc.setFontType('italic');
                    marginTop += 10;
                    this.data.content[keys[i]].forEach( item => {
                        const array = Object.keys(item).reverse();
                        for (const one of array) {
                            if (item[one]) {
                                doc.setFontSize(14);
                                doc.setFontType('bold');
                                doc.text(20 + imgSize, marginTop, one);
                                doc.setFontSize(fontsize);
                                doc.setFontType('italic');
                                position = doc.getStringUnitWidth(one) * 12;
                                position = position > 100 ? position : 100;
                                doc.text(position, marginTop , item[one].toString());
                                marginTop += 10;
                                if (marginTop >= pageHeight) {
                                    doc.addPage();
                                    marginTop = 20;
                                }
                            }
                        }
                        marginTop += 10;
                    });
                } else {
                    doc.setFontSize(14);
                    doc.setFontType('bold');
                    doc.text(20 + imgSize, marginTop , keys[i]);
                    doc.setFontSize(fontsize);
                    doc.setFontType('italic');
                    position = doc.getStringUnitWidth(keys[i]) * 12;
                    position = position > 100 ? position : 100;
                    doc.text(position, marginTop , this.data.content[keys[i]]);
                    marginTop += 10;
                }
                if (marginTop + 20 >= pageHeight) {
                    doc.addPage();
                    marginTop = 20;
                }

            }
        }
        const cv = name ? name.replace(/ /g, '_') + '.pdf' : 'cv.pdf';
        doc.save(cv);
    }

    public getData() {
        return this.data.content;
    }

    public matchHeight() {
        if (this.right && this.left) {
            const leftHeight = this.left.nativeElement.offsetHeight;
            const rightHeight = this.right.nativeElement.offsetHeight;
            return  leftHeight >  rightHeight ? leftHeight + 'px' : rightHeight + 'px';
        }
        return '100%';
    }

    ngOnInit() {
    }

    ngAfterViewChecked () {
        this.cdRef.detectChanges()
    }

}
