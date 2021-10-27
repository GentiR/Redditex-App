import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import {Activity} from '../models/activity';
import NavBar from "./NavBar"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from "uuid";

function App() {
  const [activites, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/Activities').then((response) => {
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: string){
    setSelectedActivity(activites.find(x=>x.id === id))
  }
  
  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id): handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activites.filter(x => x.id !== id)])
  }

  /*'...' is called the Spread Syntax or Spread Operator. This allows an iterable such as 
    an array expression or string to be expanded or an object expression to be expanded wherever placed.*/
  function handleCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activites.filter(x=> x.id !== activity.id), activity])
    : setActivities([...activites, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
      <ActivityDashboard 
        activities={activites}
        selectedActivity ={selectedActivity}
        selectActivity ={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
      />
      </Container>
    </>
  );
}

export default App;
