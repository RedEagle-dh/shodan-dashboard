import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import styles from '../styles/Home.module.css'

export default function Announcements() {
    return (
        <>
            <div>
                <h1>Hello World</h1>
                <label className={styles.description}>Announcement Content </label>
                <br/>
                <input className={styles.card} id="contentInput" type="text" placeholder="Please type some Content"/>
                <br/><br/>
                <label className={styles.description}>Channel ID </label>
                <br/>
                <input className={styles.card} type="text" id="channelIdInput"
                       placeholder="Please type the channel id"/>
                <br/><br/><br/>
                <button className={styles.card} onClick={submit}>Submit</button>
            </div>
        </>
    )
}

function submit() {
    const content = document.getElementById("contentInput").value;
    const channelId = document.getElementById("channelIdInput").value;
    axios.post("/api/discordSendMessageAPI", {text: content, channel: channelId}).then((data) => {
        console.log(data);
    });
}
