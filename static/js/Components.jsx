function UserSignIn({onSignIn}) {

    const [userName, setUserName] = React.useState('');
    const [regUserName, setRegUsername] = React.useState('');
    const [firstName, setFirstName] = React.useState('')
    
    const logIn = (evt) =>{
        evt.preventDefault()
        onSignIn(userName)

    }

    const registerUser = (evt) => {
        evt.preventDefault()
        
        const formInputs ={
            regUserName: regUserName,
            firstName: firstName
          };
        
          fetch('/register_user', {
            method: 'POST',
            body: JSON.stringify(formInputs),
            headers: { 
              'Content-Type' : 'application/json',
            },
          })
            .then(response => response.json())
            .then(data => {
                if (data === 'registered') {
                    alert('registered!');
                    onSignIn(regUserName);
                } else {
                    alert('username is already taken, please try again')
                }
            })
    }

    return (
        <React.Fragment>
            <form onSubmit={ (evt) => {logIn(evt)} }>
                <h2>Log In</h2>
                <label>Enter your username:
                    <input 
                        id="username-textbox" 
                        placeholder="username"
                        onChange={(event) => setUserName(event.target.value)} 
                        type="text">
                    </input>    
                </label>
                    <div>
                        <button type='submit' className='btn-primary' >
                            Sign In
                        </button>
                    </div>
            </form>
            <h1>Or Register Below</h1>
            <form onSubmit={registerUser}>
                <label> Enter your first name
                    <input 
                        type="text" 
                        placeholder="First name" 
                        aria-label="First name"
                        onChange={(event) => setFirstName(event.target.value)}/>
                </label>
                <label> Enter a username
                <input 
                    type="text" 
                    placeholder="User Name" 
                    aria-label="User name"
                    onChange={(event) => setRegUsername(event.target.value)}/>
                </label>
                <div>
                <button id="register" type="submit" className='btn-primary'> 
                Register 
                </button>
                </div>
            </form>
        </React.Fragment>
    )
}

function TimeAvailable({idx, time, onTimeClick}){

    let theTime = Object.keys(time);
    
    return (
        <div>
            {idx}
            {/* {time} */}
        </div>
    )
}

function DayScheduler({searchDate, userID, setScheduleTime}){
    const [availableTimes, setAvailableTimes] = React.useState([])
    
    React.useEffect(() => {
        fetch(`/show_times/${searchDate}`)
            .then((response) => response.json())
            .then((data) => {
                setAvailableTimes(data)
            });
    }, [searchDate]);

    const onTimeClick = () => {
        setScheduleTime()
    }
    console.log(availableTimes)
    
    return(
        <div id='time-select' className='row'>
            {searchDate}
            <div id="date-search-container" className="times-grid">
                    {availableTimes.map(
                        (time, idx) =>
                            <TimeAvailable
                                idx={idx}
                                time={time}
                                onTimeClick={onTimeClick}
                            />
                        )
                    }
            </div>
        </div>
    )
}

function Calendar({userID}) {
    const [userEvents, setUserEvents] = React.useState([]);  
    const [searchDate, setSearchDate] = React.useState('');
    const [scheduleTime, setScheduleTime] = React.useState('');
    
    React.useEffect(()=> {
        setUserEvents(['2022-04-30']);
    }, [] )
    
    const showDates = (evt) => {
        evt.preventDefault();
        console.log()
        if (userEvents.includes(evt.target.value)) {
            alert('already signed up for this date! Try again');
            setSearchDate('');
        } else {
            setSearchDate(evt.target.value);
        }
    }

    return (
        <div className='container'>
                <h2>Tell us when you would like to come in!</h2>
                <input
                    type="date"
                    value={searchDate}
                    onChange={(evt) => showDates(evt)}
                />
            { searchDate && 
                <DayScheduler searchDate={searchDate} userID={userID} setScheduleTime={setScheduleTime}/>
            }
        </div>
    )
}
