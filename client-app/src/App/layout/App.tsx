import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  //Listing Activites and spliting date and time, then pushing activities
  useEffect(() => {
    activityStore.loadingActivities();
  }, [activityStore])

  if(activityStore.loadingInitial) 
    return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
