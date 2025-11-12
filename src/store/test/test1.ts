"use client"
import {atom} from 'recoil';

export const name = atom({
    key: "app/test/nametest", // More specific key
    default: "BishalMaity"
});