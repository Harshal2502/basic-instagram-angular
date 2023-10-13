import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent {
    @Input() postImage: string = '';
    @Input() username: string = '';
    @Input() likes: number = 0;
    @Input() desc: string = '';
    @Input() time: string = '';
    @Input() index: boolean = false;

    isLiked: boolean = false;
    isSaved: boolean = false;

    ngOnInit() {
        if (!this.index) {
          this.isLiked = true;
          this.isSaved = true;
        }
      }

    toggleLike() {
        if(this.isLiked)this.likes--;
        else this.likes++;
        this.isLiked = !this.isLiked;
    }
    toggleSave() {
        this.isSaved = !this.isSaved;
    }
}
