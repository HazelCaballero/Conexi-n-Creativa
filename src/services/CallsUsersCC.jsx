async function GetUsersCC() {
    try {
        const response = await fetch('http://localhost:3000/usersCC', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching usersCC');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching usersCC:', error);
        throw error;
    }
}

async function PostUsersCC(nameU, emailU, passwordU, phoneU) {
    try {
        const userCCData = { nameU, emailU, passwordU, phoneU};

        const response = await fetch("http://localhost:3000/usersCC", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCCData)
        });

        if (!response.ok) {
            throw new Error('Error posting userCC');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting userCC:', error);
        throw error;
    }
}

async function UpdateUsersCC(nameU, emailU, passwordU, phoneU, id) {
    try {
        const userCCData = {nameU, emailU, passwordU, phoneU, id };

        const response = await fetch(`http://localhost:3000/usersCC/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCCData)
        });

        if (!response.ok) {
            throw new Error(`Error updating userCC with id ${id}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating userCC:', error);
        throw error;
    }
}

async function DeleteUserCC(id) {
    try {
        const response = await fetch(`http://localhost:3000/usersCC/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting userCC with id ${id}`);
        }

        return { message: `UserCC with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting userCC:', error);
        throw error;
    }
}


export default { GetUsersCC, PostUsersCC, UpdateUsersCC, DeleteUserCC };
