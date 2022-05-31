import React from 'react';
import { Auth } from 'aws-amplify';
import {ButtonGroup, DropdownButton, Dropdown} from 'react-bootstrap';
import './AccountGroup.css';

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

// function changePass() {
//     Auth.currentAuthenticatedUser()
//         .then(user => {
//             return Auth.changePassword(user, 'oldPassword', 'newPassword');
//         })
//         .then(data => console.log(data))
//         .catch(err => console.log(err));
// }

const AccountGroup = ({username}) => {

return(
    <ButtonGroup vertical>
        <DropdownButton as={ButtonGroup} title={username} id="bg-vertical-dropdown-1" variant="light">
                {/* <Dropdown.Item 
                    eventKey="2" 
                    // onClick={() => changePass()}
                >
                    Change Password
                </Dropdown.Item> */}
            <Dropdown.Item onClick={() => signOut()} eventKey="3">Sign Out</Dropdown.Item>
        </DropdownButton>
    </ButtonGroup>
    );
}

export default AccountGroup;