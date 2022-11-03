
const TestRoute = ({ user }) => {
    console.log(user);
    if (user) {
        return <p> Hello {user} </p>
    }

    else {
        return <p> You need to log in first! </p>
    }
}

export default TestRoute;