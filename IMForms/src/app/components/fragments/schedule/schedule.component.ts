import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { MD_DIALOG_DATA, MdDialogRef, MdDialog } from '@angular/material';
import { OrderbyPipe } from '../../../common/orderby-pipe/orderby.pipe';
import { KeysPipe } from '../../../common/keys-pipe/keys.pipe';
import { GeneratedScheduleComponent } from './generated-schedule/generated-schedule.component';
import { PopUpComponent } from '../pop-up/pop-up.component'
import { ContenteditableModelDirective } from '../../../common/contenteditable/contenteditable-model.directive';



@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.less'],

})
export class ScheduleComponent implements OnInit, AfterViewChecked {
    public checked = false;
    public generating = false;
    public isListView: Boolean;
    public meetings: number;
    public labels = [];
    public criteries = [];
    public selected = [];
    public activated = false;
    public groups = [];
    public dates = [];
    public times = [];
    public keys = [];
    private coefficient: number;
    private startTime: any;
    @ViewChild(PopUpComponent) dialog: PopUpComponent;

    constructor( @Inject(MD_DIALOG_DATA) public data: any,
        private dragulaService: DragulaService,
        private dialogRef: MdDialogRef<ScheduleComponent>,
        private cdRef: ChangeDetectorRef) {

        Object.keys(this.data.title.description).forEach(
            item => {
                if (this.data.title.description[item]['type'] === 'FullNameComponent') {
                    this.labels['name'] = this.data.title.description[item].data.config;
                }
                let diffInHours = 0;
                if (this.data.title.description[item]['type'] === 'ExamsComponent') {
                    this.startTime = this.data.title.description[item].data.startTime;
                    let startDate = new DatePipe('enUs').transform(this.data.title.description[item].data.startDate, 'shortDate');
                    let endDate = new DatePipe('enUs').transform(this.data.title.description[item].data.endDate, 'shortDate');
                    if (!endDate && startDate) {
                        endDate = startDate;
                    }

                    if (!startDate && endDate) {
                        startDate = endDate;
                    }

                    const endTime = this.data.title.description[item].data.endTime;
                    this.dates = this.getDates(new Date(startDate), new Date(endDate));
                    if (this.startTime && endTime) {
                        this.times = this.getHoursRange(this.startTime, endTime);
                    }
                    diffInHours = this.getDiffInHours(endTime);
                    this.labels['date'] = this.data.title.description[item].data.config;
                    this.labels['time'] = this.data.title.description[item].data.config;
                }
                if (isNaN(diffInHours) || 0 >= diffInHours) {
                    this.coefficient = 4;
                } else {
                    this.coefficient = diffInHours;
                }
            }
        );
        this.criteries = Object.keys(this.data.content[0]).filter(key => {
            return key !== this.labels['date'].firstDay.label && key !== this.labels['date'].lastDay.label &&
                key !== this.labels['time'].firstTime.label && key !== this.labels['time'].lastTime.label &&
                key !== 'date' && key !== 'time';
        });



        const bag: any = this.dragulaService.find('first-bag');
        if (bag !== undefined) {
            this.dragulaService.destroy('first-bag');
        }

        dragulaService.setOptions('first-bag', {
            copy: false,
            invalid: function (el, handle) {
                return el.id === 'head';
            },
        });


        dragulaService.drop.subscribe((value) => {
            if (value[0] === 'another-bag') {
                this.updateGroups();
            }
        });
        dragulaService.drag.subscribe((value) => {
            if (value[0] !== 'another-bag') {
                value[1].classList.add('no-hover');
            }
        });

        dragulaService.dragend.subscribe((value) => {
            if (value[0] !== 'another-bag') {
                value[1].classList.remove('no-hover');
            }
        });

        this.isListView = true;
    }

    ngOnInit() {
    }

    public selectedCritery(critery: any) {
        const index = this.criteries.indexOf(critery);
        if (-1 !== index) {
            this.criteries.splice(index, 1);
        }
        this.selected.push(critery);
        this.updateGroups();
    }

    public deselectedCritery(critery: any) {
        const index = this.selected.indexOf(critery);
        this.selected.splice(index, 1);
        this.criteries.push(critery);
        this.updateGroups();
    }

    public ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }


    public updateGroups() {
        if (!this.meetings) {
            return;
        }
        if (!this.checked) {
            this.groups = this.createParts((new OrderbyPipe).transform(this.data.content, this.selected),
                this.meetings * this.coefficient);
            if (this.labels['time'] && this.startTime) {
                for (const index of Object.keys(this.groups)) {
                    this.groups[index] = this.groupByTime(this.groups[index]);
                }
            }
        }

        if (this.checked && (this.labels['date'] || this.labels['time'])) {
            this.groups = this.groupByDate();
        }
        this.keys = Object.keys(this.groups).map((key: any) => {
            if (/^\d+$/.test(key)) {
                key++;
            }
            return 'Group ' + key;
        });
    }

    private getShortest(arr) {
        let shortest = Object.keys(arr)[0];
        let minLength = this.meetings * this.coefficient;
        for (const index of Object.keys(arr)) {
            let size = 0;
            for (const one of Object.keys(arr[index])) {
                size += Object.keys(arr[index][one]).length;
            }
            if (size < minLength) {
                shortest = index;
                minLength = size;
            }
        }
        return shortest;
    }

    private getDates(startDate: Date, endDate: Date) {
        const dates = [];
        let currentDate = startDate;
        const addDays = function (days) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
        while (currentDate <= endDate) {
            dates.push(new DatePipe('enUs').transform(currentDate, 'shortDate'));
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    }

    private createParts(arr: any[], size: number) {
        const groups = [];
        for (let i = 0, j = 0; i < arr.length; i += size, j++) {
            if (this.dates.length > 0) {
                groups[this.dates[j]] = arr.slice(i, i + size);
            } else {
                groups.push(arr.slice(i, i + size));
            }
        }
        return groups;
    }

    private groupByDate() {

        const groups = this.data.content;

        for (const item of Object.keys(groups)) {
            groups[item]['date'] = this.getDates(groups[item][this.labels['date'].firstDay.label], 
                                groups[item][this.labels['date'].lastDay.label]);
            groups[item]['time'] = this.getHoursRange(groups[item][this.labels['time'].firstTime.label],
                                groups[item][this.labels['time'].lastTime.label])
        }


        groups.sort((a, b) => {
            if (0 === a.date.length && 0 < b.date.length) {
                return 1;
            }

            if (0 === b.date.length && 0 < a.date.length) {
                return -1;
            }

            if (a.date.length > 0 && a.date.length < b.date.length) {
                return -1;
            }

            if (a.date.length === b.date.length) {

                if (0 === a.time.length && 0 < b.time.length) {
                    return 1;
                }

                if (0 === b.time.length && 0 < a.time.length) {
                    return -1;
                }

                if (a.time.length > 0 && a.time.length < b.time.length) {
                    return -1;
                }

            }
            return 1;
        });


        const grouped = [];
        this.dates.forEach(date => {
            grouped[date] = [];
        });
        groups.forEach(item => {
            let actualDay = '';
            if (!item.date) {
                actualDay = 'other';
                item.date = [];
            }

            let completed = false;
            let group;
            for (let i = 0; i < item.date.length; ++i) {
                const day = item.date[i];
                if (grouped[day]) {
                    if (grouped[day].length < this.meetings * this.coefficient) {
                        group = grouped[day];
                        completed = true;
                        break;
                    }
                }
            }

            if (!completed && actualDay === 'other') {

                group = grouped[actualDay];

            } else if (!completed) {
                let index = this.dates.indexOf(item.date[0]);
                if (-1 === index) {
                    index = 0;
                }
                group = this.findGroup(index, 0, grouped);
            }

            if (!group) {
                group = grouped['other'];
            }

            if (!grouped['other']) {
                grouped['other'] = [];
            }
            const a = Object.assign({}, group);
            group.push(item);

        });

        if (this.times.length > 0) {
            for (const index in grouped) {
                if (index !== 'other') {
                    grouped[index] = this.groupByTime(grouped[index]);
                }
            }
        }

        grouped['other'] = (new OrderbyPipe()).transform(grouped['other'], this.selected);
        const temp = [];
        for (const index of Object.keys(grouped['other'])) {
            const shortest = this.getShortest(grouped);
            grouped[shortest].push(grouped['other'][index]);
            temp.push(grouped['other'][index]);
            grouped[shortest] = this.times.length > 0 ? this.groupByTime(grouped[shortest]) : grouped[shortest];
        }
        grouped['other'] = grouped['other'].filter(val => {
            return temp.indexOf(val) === -1;
        });

        if (grouped['other'].length === 0) {
            delete grouped['other'];
        }
        return grouped;
    };


    private findGroup(index: any, num: number, group: any[]) {
        if (index + num < 0 || index < 0) {
            return false;
        }

        if (!group[this.dates[index + num]]) {
            group[this.dates[index + num]] = [];
            return group[this.dates[index + num]];
        }

        const len = group[this.dates[index + num]].length;
        if (len < this.meetings * this.coefficient) {
            return group[this.dates[index + num]];
        }

        if (0 < num) {
            return this.findGroup(index, -num, group);
        }
        return this.findGroup(index, -num + 1, group);
    }

    private groupByTime(group) {
        const grouped = [];
        this.times.forEach(time => {
            grouped[time] = [];
        });
        const a = Object.assign({}, group);
        group.forEach(item => {
            let completed = false;
            if (item.time === '' || !item.time) {
                item.time = [];
            };
            for (let i = 0; i < item.time.length; ++i) {
                const time = item.time[i];
                if (grouped[time]) {
                    if (grouped[time].length < this.meetings) {
                        grouped[time].push(item);
                        completed = true;
                        break;
                    }
                }
            }
            if (!completed) {
                let actualTime = item.time[0] || this.startTime;
                let diff = this.getDiffInHours(actualTime);
                if (isNaN(diff) || diff < 0) {
                    diff = 0;
                }
                actualTime = this.findTimeGroup(grouped, diff, 0) || 'extra';
                if (!grouped[actualTime]) {
                    grouped[actualTime] = [];
                }
                grouped[actualTime].push(item);
            }
        });

        return grouped;
    }

    private findTimeGroup(grouped, index, num) {

        if (index + num < 0 && Math.abs(index + num) < this.coefficient) {
            num = -num + 1;
        }

        if (index + num < 0 || index + num > this.coefficient) {
            return false;
        }

        const day = new Date('9-12-2017 ' + this.startTime);
        day.setHours(day.getHours() + index + num);
        let hour: any = day.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }
        const minute = day.getMinutes() || '00';

        const actualTime = hour + ':' + minute;
        if (actualTime < this.times[this.times.length - 1]) {
            grouped[actualTime] = grouped[actualTime] || [];
            if (grouped[actualTime].length < this.meetings) {
                return actualTime;
            }
        }

        if (0 < num) {
            return this.findTimeGroup(grouped, index, -num);
        }
        return this.findTimeGroup(grouped, index, -num + 1);
    }

    private getHoursRange(start, end) {
        const startTime = parseInt(start.slice(0, start.indexOf(':')), 10);
        let endTime = parseInt(end.slice(0, end.indexOf(':')), 10);
        const minutes = start.slice(start.indexOf(':') + 1);
        const times = [];

        if (endTime === 0) {
            endTime = 24;
        }

        for (let i = startTime; i <= endTime; i++) {
            let time = i + ':' + minutes;
            if (i < 10 && time[0] !== '0') {
                time = '0' + time;
            }

            times.push(time);
        }

        return times;
    }

    private getDiffInHours(date) {
        const date1: string = '9-12-2017 ' + this.startTime;
        const date2: string = '9-12-2017 ' + date;
        const diffInMs: number = Date.parse(date2) - Date.parse(date1);
        return diffInMs / 1000 / 60 / 60;
    }

    onChange(e: Event) {
        this.isListView = !this.isListView;
    }

    public okTime(days: any[], day: any) {
        if (!days) {
            return false;
        }
        if (days.length === 0) {
            return false;
        }
        return !days.includes(day);
    }

    public onGenerate() {
        this.isListView = true;
        const group = Object.assign([], this.groups);

        for (const index of Object.keys(group)) {
            this.removeEmptyObjects(group[index]);
        }
        const propNames = Object.getOwnPropertyNames(group);
        for (let i = 0, j = 0; i < propNames.length; i++) {
            const propName = propNames[i];
            if (Object.keys(group[propName]).length === 0 && propName !== 'length') {
                this.keys.splice(i - j, 1);
                j++;
                delete group[propName];
            }
        }
        const content = {};
        content['form'] = this.data.title;
        content['keys'] = this.keys;
        let data = [];
        data = group;
        const width = window.screen.width;
        const length = width < 768 ? width.toString() + 'px' : (width * 0.5).toString() + 'px';
        this.dialog.open(GeneratedScheduleComponent, content, data, length);
        this.dialogRef.close(this.groups);
    }

    private removeEmptyObjects(object) {
        const propNames = Object.getOwnPropertyNames(object);
        for (let i = 0; i < propNames.length; i++) {
            const propName = propNames[i];
            if (object[propName] === null || object[propName] === undefined || object[propName].length === 0) {
                delete object[propName];
            }
        }
    }

    public toggleDropdown($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.activated = !this.activated;
    }

    public changeState(value) {
        this.activated = value;
    }

}
