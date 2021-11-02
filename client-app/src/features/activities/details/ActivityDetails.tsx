import {Card, Image, Button} from "semantic-ui-react";
import LoadingComponent from "../../../App/layout/LoadingComponent";
import { useStore } from "../../../App/stores/store";


export default function ActivityDetails(){

    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

    //Adding because typescripts isn't that smart to understand that we have an activity 
    //othervise we kan just add an '?' or '!' at our properties it's the same thing
    if(!activity) 
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
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}