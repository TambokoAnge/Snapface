import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../../../core/Models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;
  buttonText! : string;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit() : void{
      this.buttonText = "Oh Snap!";
      const faceSnapId = +this.route.snapshot.params['id'];
      this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap(faceSnapId: number){
    if(this.buttonText=="Oh Snap!"){
      this.faceSnap$= this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
        tap(() => this.buttonText= 'Oops, un Snap!')
      );
    }
    else{
      this.faceSnap$= this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
        tap(() => this.buttonText = "Oh Snap!")
      );
    };
    }
  }
