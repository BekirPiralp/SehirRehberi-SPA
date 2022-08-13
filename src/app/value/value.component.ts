import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Value } from '../models/value';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  constructor(private htpp:HttpClient) { }

  ngOnInit() {
    this.values = this.getValues(); 
  }
  public values:Value[]=[]; //Boş olarak value dizisi oluşturduk

  private readonly path:string = 'https://localhost:7084/api/Values';

  getValues():Value[]{
    var result:Value[]=[];
    this.htpp.get<Value[]>(this.path).subscribe((data)=>{result=data;});
    return result;
  }
}
