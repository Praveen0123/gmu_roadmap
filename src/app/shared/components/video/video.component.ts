import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'gmu-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit
{
  playVideo = false;

  @Input() videoUrl: string = '';
  @Input() posterUrl: string = '';
  @ViewChild('videoPlay') private videoPlay: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  playVideos()
  {
    this.playVideo = !this.playVideo;

    setTimeout(() =>
    {
      this.playPause();
    }, 1000);
  }

  playPause()
  {
    const video: HTMLVideoElement = this.videoPlay.nativeElement;

    if (video.paused)
    {
      video.play();
    }
    else
    {
      video.pause();
    }
  }

  videoHasEnd()
  {
    this.playVideo = false;
  }
}
