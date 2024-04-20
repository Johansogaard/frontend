import { useContext } from 'react';
import { UserContext} from '../state/userState/userContext';



export function UserPage() {
    const { state } = useContext(UserContext);

return (
    <>
    {state.isAuthenticated? (
        <div>
            <h1>Logged in</h1>
        </div>
    
    ) : (
        <div>
            <h1>Not logged in</h1>
        </div>
    )}
    

    </>

)
}