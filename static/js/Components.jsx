function UserSignIn({onSignIn}) {

    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const logIn = (evt) =>{
        evt.preventDefault()
        onSignIn(userName)

    }

    const registerUser = (evt) => {
        evt.preventDefault()
        console.log('register')
    }

    return (
        <React.Fragment>
            <form onSubmit={ (evt) => {logIn(evt)} }>
                <h2>Log In</h2>
                <label>Enter your name:
                    <input 
                        id="username-textbox" 
                        placeholder="username"
                        onChange={(event) => setUserName(event.target.value)} 
                        type="text">
                    </input>    
                </label>
                <label>Enter your password:
                    <input 
                        id="password" 
                        placeholder="password"
                        onChange={(event) => setPassword(event.target.value)} 
                        type="password">
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
                    <input type="text" placeholder="First name" aria-label="First name"/>
                </label>
                <label> Enter a password
                    <input name="password" type="password" placeholder="password"/>
                </label>
                <div>
                <button id="register" type="submit" className='btn-primary'> 
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
