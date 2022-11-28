import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';

export default function Announcements() {

    return (
        <>
            <h1>Setup the standard channels for some features of the bot</h1>
            <br/><br/>
            <form onSubmit={a}>
                <label>Member Welcome Channel</label>
                <div style={{marginTop: 20}}>
                    <select id="memberWelcome" onClick={addListeners}>
                    </select>
                    <button type="submit" className="button-3" style={{marginLeft: 5}}>Submit</button>
                </div>
            </form>
            <br/><br/>

            <form onSubmit={c}>
                <label>Event Announcement Channel</label>
                <div style={{marginTop: 20}}>
                    <select id="eventAnnouncement" onClick={addListeners}>
                    </select>
                    <button type="submit" className="button-3" style={{marginLeft: 5}}>Submit</button>
                </div>
            </form>
            <br/><br/><br/>

            <form onSubmit={b}>
                <label>Member Count Voice Channel</label>
                <div style={{marginTop: 20}}>
                    <select id="memberCount" onClick={addListeners}>
                    </select>
                    <button type="submit" className="button-3" style={{marginLeft: 5}}>Submit</button>
                </div>
            </form>
        </>
    )


}


function a() {
    submit("memberWelcome", document.getElementById("memberWelcome").value);
}

function b() {
    submit("memberCount", document.getElementById("memberCount").value);
}

function c() {
    submit("eventAnnouncement", document.getElementById("eventAnnouncement").value);
}

function submit(feature, channelId) {
    console.log(channelId);
    axios.patch("/api/patchChannel", {
        channelId: document.querySelector('option').getAttribute('value'),
        feature: feature
    }).then((data) => {
        console.log(data.status);
    }).then(() => {
        alert("Alright, Submitted!");
    })
}

function addListeners() {
    const dropdowns = document.querySelectorAll('select');
    for (const drop of dropdowns) {
        let dropdownArray = [...document.querySelectorAll('option')];

        if (dropdownArray.length === 0) {
            axios.get("/api/getTextChannelsFromGuild", {
                params: {
                    guild: "992063037873856533"
                }
            }).then((data) => {
                for (let i = 0; i < data.data.channels.length; i++) {
                    const li = document.createElement('option');
                    li.classList.add('value');
                    li.setAttribute('value', data.data.channels[i].id);
                    li.innerHTML = data.data.channels[i].name;
                    drop.appendChild(li);
                }
            })
            dropdownArray = [...document.querySelectorAll('option')];
        }
    }

}
