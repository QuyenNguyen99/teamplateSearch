import { Component, OnInit, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
// import { data } from 'app/data';
import { TodoService } from 'app/todo.service';
import { collectAndResolveStyles } from '@angular/core/src/animation/animation_style_util';
import { defaultCipherList } from 'constants';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  id_category: number;
  tieude: String = '';
  list = [];
  arrContent: any = [];
  idRemove: number = null;
  constructor(private router: Router, private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getAll().subscribe((todos) => {
      console.log('hello world', todos);
      this.arrContent = todos;
      // this.arrContent.value().slice(0,2);
    });
  }

  // xử lý để hiển thị bảng confirm
  removeContact(id: number) {
    this.an_hien = true;
    this.idRemove = id;
  }
  an_hien: any = false;

  // xử lý xác nhận delete:

  removeContacts() {
    if (this.an_hien = true) {
      console.log(this.idRemove);
      this.list.push(this.idRemove);
      this.list.forEach(item => {
        this.todoService.deletes(item).subscribe(() => {
          this.todoService.getAll().subscribe((todos) => {
            console.log('hello world', todos);
            this.arrContent = todos;
          });
        })
      });
      this.an_hien = false;
      this.list = [];
    }
  }

  // xử lý xác nhận cancel:
  cancelContact(id_category: number) {
    this.an_hien = false;
    console.log(id_category);
    this.list = [];
  }

  //checkbox:
  check(arr) {
    arr.check = !arr.check ? true : false;
    console.log(arr.check);
  }

  removeContactAll(id_category: number) {
    for (var arr of this.arrContent) {
      if (arr.check === true) {
        var dele = this.list.push(arr.id_category);
      } else { }
    }
    console.log(this.list);
    this.an_hien = true;
    this.idRemove = dele;
  }

  removeCheckAll(id_category: number, checked) {
    var checkbox = document.getElementsByName('hobby1');
    if (checked = checkbox) {
      //childchecked = checked;
      for (var arr of this.arrContent) {
        this.list.push(arr.id_category);
      }
      console.log(this.list);
    }
    else {
      //childchecked = false;
      this.list = [];
    }
  }

  search() {
      this.todoService.getSearch(this.tieude).subscribe((todos) => {
        console.log(this.tieude);
        this.arrContent = todos;
      });
  }

}

// n là số page, x là số phần tử trong page đó.
// page = req.query.page
// start = (n-1)*x;
// end = (n-1)*x+x;
// todos = arr.slice(start,end);

  // list_abc: any = [
  //   {id:0,check:false},
  //   {id:1,check:true},
  //   {id:2,check:false},
  //   {id:3,check:true},
  //   {id:4,check:false},
  //   {id:5,check:true},
  //   {id:6,check:false},
  //   {id:7,check:true},
  //   {id:8,check:false},
  //   {id:9,check:true}
  // ];
  // //viet mot function lay ra danh sach id voi dieu kien check = true
  // //input list_abc
  // //return list_ids
  // get_list_ids_by_check_true() {
  //   var list_ids = [];
  //   for(var i of this.list_abc){
  //     if(i.check === true){
  //        list_ids.push(i.id)
  //     }else{}
  //   }
  //   console.log(list_ids);
  // }
//https://tedu.com.vn/video/angular-2-can-ban-bai-29-tim-kiem-trong-bang-241.html

//https://freetuts.net/ung-dung-single-page-angular-4-1357.html