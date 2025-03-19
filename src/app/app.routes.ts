import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WebJobsComponent } from './pages/web-jobs/web-jobs.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { NewJobComponent } from './pages/new-job/new-job.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:"home",
        pathMatch:'full'
    },
    {
        path:'home',
        component: HomeComponent,
        title: "Free Lancer Jobs"
    },
    {
        path:'jobs',
        component:WebJobsComponent 
    },
    {
        path:'myJobs',
        component:JobsComponent 
    },
    {
        path:'new-job',
        component:NewJobComponent 
    },
    {
        path:'edit-job/:id',
        component:NewJobComponent 
    },
    {
        path:'users',
        component:UsersComponent 
    },
    {
        path:"**",
        component:NotFoundComponent
    }

];
