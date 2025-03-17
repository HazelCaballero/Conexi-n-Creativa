async function GetBarterings() {
    try {
        const response = await fetch('http://localhost:3000/barterings', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching barterings');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching barterings:', error);
        throw error;
    }
}

async function PostBarterings(nameB, idUserCreate, idUserAprove, resourceOffered, resourceRequest, stateB, commentsB) {
    try {
        const barteringData = { nameB, idUserCreate, idUserAprove, resourceOffered, resourceRequest, stateB, commentsB};

        const response = await fetch("http://localhost:3000/barterings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(barteringData)
        });

        if (!response.ok) {
            throw new Error('Error posting bartering');
        }

        return await response.json();
    } catch (error) {
        console.error('Error posting bartering:', error);
        throw error;
    }
}

async function UpdateBarterings(nameB, idUserCreate, idUserAprove, resourceOffered, resourceRequest, stateB, commentsB, id) {
    try {
        const barteringData = {nameB, idUserCreate, idUserAprove, resourceOffered, resourceRequest, stateB, commentsB, id };

        const response = await fetch(`http://localhost:3000/barterings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(barteringData)
        });

        if (!response.ok) {
            throw new Error(`Error updating bartering with id ${id}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating bartering:', error);
        throw error;
    }
}

async function DeleteBartering(id) {
    try {
        const response = await fetch(`http://localhost:3000/barterings/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting bartering with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting bartering:', error);
        throw error;
    }
}


export default { GetBarterings, PostBarterings, UpdateBarterings, DeleteBartering };
