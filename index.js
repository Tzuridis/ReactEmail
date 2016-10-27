var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var EMAILS = {
    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
};

var Email = function (props) {
    let Content;
     if (props.location !== '/emails/inbox') {
                    Content = (
                  <div>
                  <div>From: {props.from} </div>
                  
             <div>Content: {props.content} </div>
             </div>
                    )
             }
    return (
        <div key={props.id}>
            <strong>
                <Link to={'/emails/inbox/' + props.id}>
                    {props.title}
                </Link>
            </strong>
            {Content}
        </div>
    );
};

var EmailSpam = function (props) {
    let Content;
     if (props.location !== '/emails/inbox') {
                    Content = (
                  <div>
                  <div>From: {props.from} </div>
                  
             <div>Content: {props.content} </div>
             </div>
                    )
             }
    return (
        <div key={props.id}>
            <strong>
                <Link to={'/emails/spam/' + props.id}>
                    {props.title}
                </Link>
            </strong>
                {Content}
        </div>
    );
};

var EmailList = function (props) {
    return (
        <div>
            <strong>
                {Object.keys(EMAILS).map(function (name) {
                    return (
                        <p key={name}>
                            <Link to = {'/emails/' + name}>
                                {name}
                            </Link>
                        </p>
                    )
                })
                }
            </strong>
        </div>
    );
};

var InboxList = function (props) {
    var emails = [];
    for (var i in EMAILS.inbox) {
        emails.push(
            <li key={i}>
                <Email id={EMAILS.inbox[i].id} title={EMAILS.inbox[i].title}
                    content={EMAILS.inbox[i].content}S/>
            </li>
        )
    }
    return (
        <ul>
            {emails}
        </ul>
    );
};

var SpamList = function (props) {
    var emails = [];
    for (var i in EMAILS.spam) {
        emails.push(
            <li key={i}>
                <EmailSpam id={EMAILS.spam[i].id} title={EMAILS.spam[i].title}
                    content={EMAILS.spam[i].content} />
            </li>
        )
    }
    return (
        <ul>
            {emails}
        </ul>
    );
};

var EmailListContainer = function () {
    return <EmailList />;
}


var InboxListContainer = function () {
    return <InboxList />;
};

var SpamListContainer = function () {
    return <SpamList />;
};

var InboxContainer = function (props){
    var email = EMAILS.inbox[props.params.inboxId];
    return <Email id={email.id} title={email.title} from={email.from} 
                    content={email.content} location={props.pathname} />
}

var SpamContainer = function (props){
    var email = EMAILS.spam[props.params.spamId];
    return <EmailSpam id={email.id} title={email.title} from={email.from} 
                    content={email.content} location={props.pathname} />
}


var App = function (props) {
    return (
        <div>
            <h1>
                Emails App
            </h1>
            <div>
                {props.children}
            </div>
        </div>
    );
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/emails" component={App}>
            <IndexRoute component={EmailList} />
            <Route path="/emails/inbox" component={InboxListContainer} />
            <Route path="/emails/spam" component={SpamListContainer} />
             <Route path="/emails/inbox/:inboxId" component={InboxContainer} />
            <Route path="/emails/spam/:spamId" component={SpamContainer} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(routes, document.getElementById('app'));
});
