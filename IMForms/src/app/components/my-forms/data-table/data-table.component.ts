import { Component, OnInit, Input, ChangeDetectorRef, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopUpComponent } from '../../fragments/pop-up/pop-up.component';
import { CvComponent } from '../../fragments/cv/cv.component';
import { FormsService } from '../../../services/forms/forms.service';
import { HttpClient } from '../../../services/HttpClient';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.less']
})

export class DataTableComponent implements OnInit, AfterViewChecked {
    public selected: Array<any> = [];
    public rows: Array<any> = [];
    public columns: Array<any> = [];
    public page = 1;
    public maxSize = 5;
    public numPages = 1;
    public length = 0;
    public pages: any = [5, 10, 15];
    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '', columnName: '' },
        className: ['table-striped', 'table-bordered', 'table-hover', 'table-responsive'],
    };
    public item: number;
    public itemsPerPage = 5;
    public pageEvent: any;
    @Input() data: any;
    @Input() info: any;
    @Input() id: any;
    @ViewChild(PopUpComponent) dialog: PopUpComponent;
    public keys: Array<any>;

    public constructor(
        private cdRef: ChangeDetectorRef,
        private formService: FormsService,
        private http: HttpClient
    ) { }

    public ngOnInit(): void {
        this.keys = Object.keys(this.data[0]);
        for (let i = 0; i < this.keys.length; ++i) {
            this.columns[i] = {
                title: this.capitalize(this.keys[i]),
                name: this.keys[i], sort: '',
                filtering: {
                    filterString: '',
                    placeholder: 'filter'
                }
            };
            this.length = this.data.length;
        }
        this.config.filtering.columnName = this.columns[0].name;
        this.onChangeTable(this.config);
    }

    public changePage(page: any, data: Array<any> = this.data): Array<any> {
        const start = (page.page - 1) * page.itemsPerPage;
        const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }
        const columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    if (!item[column.name]) {
                        item[column.name] = '';
                    }
                    return item[column.name].match(column.filtering.filterString);

                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }
        if (config.filtering.columnName) {
            return filteredData.filter((item: any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString));
        }

        const tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
                if (item[column.name].toString() === this.config.filtering.filterString) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        this.itemsPerPage = page.itemsPerPage;
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        const filteredData = this.changeFilter(this.data, this.config);
        const sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }

    public changed (person: any) {
        const index: number = this.selected.indexOf(person);
        if (index !== -1) {
            this.selected.splice(index, 1);
        } else {
            this.selected.push(person);
        }
        this.formService.setSelected(this.selected);
    }

    public onCellClick(person: any): any {
        const index = this.rows.indexOf(person);
        const id = '?id=' + this.id;
        const content = this.info[index] || person;
        const length = window.screen.width > 768 ? (window.screen.width * 0.5).toString() + 'px' :
        (window.screen.width * 0.8).toString() + 'px';
        this.http.Get('forms' + id).subscribe(
            data => {
                this.dialog.open(CvComponent, data, content, length);
            },
        );
    }

    public checked(row: any): boolean {
        const index: number = this.formService.getSelected().indexOf(row);
        return index !== -1;
    }

    public changeAll() {
        if (this.data.length !== this.selected.length) {
            this.selected = Object.assign([], this.data);
        } else {
            this.selected = [];
        }
        this.formService.setSelected(this.selected);
    }

    public capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
}
