import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {Card, Image, Button} from "semantic-ui-react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";


export default observer( function ActivityDetails(){

    const {activityStore} = useStore();
    const {selectedActivity: activity,loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) 
            loadActivity(id);
    }, [id, loadActivity]);

    //Adding because typescripts isn't that smart to understand that we have an activity 
    //othervise we kan just add an '?' or '!' at our properties it's the same thing
    if(loadingInitial || !activity) 
        return <LoadingComponent/>;

    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>

                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>

                <Card.Description>
                   {activity.description}
                </Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as ={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'/>
                    <Button as ={Link} to='/activities' basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})