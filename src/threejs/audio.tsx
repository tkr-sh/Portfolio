"use client";

import * as THREE from 'three';


export const playAudioLoop = () => {
    const listener = new THREE.AudioListener();
    const audioLoader = new THREE.AudioLoader();

    const audio = new THREE.Audio(listener);
    audio.setLoop(true);
    audio.setVolume(0.5);

    audioLoader.load("output.mp3", (buffer: any) => {
        audio.setBuffer(buffer);
        audio.play();
    });

    return audio;
}




export class PlaySong {
    private listener: THREE.AudioListener | null = null;
    private audioLoader: THREE.AudioLoader | null = null;
    private audio: THREE.Audio | null = null;
    private time: number = 0;
    private songDuration: number = -1;

    constructor() {
        if (typeof window === 'undefined') return;

        this.listener = new THREE.AudioListener();
        this.audioLoader = new THREE.AudioLoader();
        this.audio = new THREE.Audio(this.listener);

        this.audio.setVolume(0.5);
        this.updateTime();
    }


    /*
     * Change the song that the user is listening to
     */
    public changeSong = (song: string, callback: (arg1: number) => any) => {
        this.time = 0;

        if (this.audio === null || this.audioLoader === null) return;

        this.audio.stop();

        this.audioLoader.load(`audio/${song}.mp3`, (buffer: any) => {
            
            this.songDuration = buffer.duration;
            this.audio?.setBuffer(buffer);
            this.audio?.setVolume(0.5);
            this.audio?.play();

            callback(this.songDuration);
        });
    }


    /*
     * Start or pause the audio
     */
    public pause = () => {

        if (this.audio === null || this.audioLoader === null) return;

        if (this.audio.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
    }


    /*
     * Change the volume of the audio playing
     */
    public changeVolume = (volume: number) => {
        this.audio?.setVolume(volume);
    }


    /*
     * Update the time listening to the song
     */
    private updateTime = () => {
        this.time += 1;

        setTimeout(this.updateTime, 1_000);
    }

    //  Get the duration of the song
    public getDurationSong = () => this.songDuration;

    // Get and setter of this
    public getTime = () => this.time;
    public setTime = (t: number) => {this.time = t};

}
