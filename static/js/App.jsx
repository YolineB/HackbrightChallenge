
function App(){

    const [userID, setUserID] = React.useState(null)

    const onSignIn = (userID) => {
        console.log('back at app w/ registerting userID')
        setUserID(userID)
    }
   
    
    return (
        <React.Fragment>
            { !userID &&
                <UserSignIn onSignIn={onSignIn}/>
            }
            {userID && 
                <Calendar userID={userID}/>
            }
        </React.Fragment>

    )
}

ReactDOM.render(<App />, document.querySelector('#root'));