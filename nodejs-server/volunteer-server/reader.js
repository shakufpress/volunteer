const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

const FULL_NAME = 1 //"שם מלא"
const EMAIL = 2 // "אימייל"
const PHONE = 3 // "טלפון"
const FACEBOOK_URL = 4 // "קישור לפרופיל פייסבוק"
const CITY = 5 // "עיר מגורים"
const HOURS_PER_WEEK = 6 // "שעות פנויות בשבוע"
const SPECIALTIES = 7 // "תחומי עניין / מומחיות"
const COMMENTS = 8 // "ספר/י לנו עלייך או כל הערה רלוונטית"

let inputStream = Fs.createReadStream('data.tsv', 'utf8');

specialties = {}
volunteers = []

inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter: '\t' }))
    .on('data', function (row) {
        user_specialties = [];
        row[SPECIALTIES].split(',').forEach(s => {
            specialty_id = 0;
            if (specialties.hasOwnProperty(s)) {
                specialty = specialties[s];
                specialty_id = specialty.id;
            } else {
                specialty_id = specialties.length;
                try {
                    specialty = s.split(':');
                    specialty = {
                        id: specialty_id,
                        name: specialty[1].trim(),
                        category: specialty[0].trim(),
                    }
                } catch (ex) {
                    specialty = {
                        id: specialty_id,
                        name: specialty[0].trim(),
                        category: "כללי",
                    };
                }
                specialties[s] = specialty;
            }
            user_specialties.push(specialty_id);
        });
        console.log(user_specialties)
    })
    .on('end', function (data) {
        console.log('No more rows!');
        console.log(specialties);
    });