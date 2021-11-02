import {Grid} from 'semantic-ui-react';
import ActivityList from "./ActivityList";
import { useStore } from '../../../App/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../App/layout/LoadingComponent';


export default observer( function ActivityDashboard(){

    const {activityStore} = useStore();
    const {loadingActivities, activityRegistry} = activityStore;

    //Listing Activites and spliting date and time, then pushing activities
    useEffect(() => {
    if(activityRegistry.size <= 1) loadingActivities();
    }, [activityRegistry.size, loadingActivities])
  
    if(activityStore.loadingInitial) 
      return <LoadingComponent content='Loading app'/>

        return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>

            <Grid.Column width='6'>
           </Grid.Column>
        </Grid>
    )
})
