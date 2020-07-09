const fs = require('fs');
const CsvReadableStream = require('csv-reader');

const FULL_NAME = 1 //"שם מלא"
const EMAIL = 2 // "אימייל"
const PHONE = 3 // "טלפון"
const FACEBOOK_URL = 4 // "קישור לפרופיל פייסבוק"
const CITY = 5 // "עיר מגורים"
const HOURS_PER_WEEK = 6 // "שעות פנויות בשבוע"
const SPECIALTIES = 7 // "תחומי עניין / מומחיות"
const COMMENTS = 8 // "ספר/י לנו עלייך או כל הערה רלוונטית"

let inputStream = fs.createReadStream('data.tsv', 'utf8');

specialties = {}
volunteers = []
specialties_length = 1;

inputStream
.pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, delimiter: '\t' }))
.on('data', function (row) {
    /* Create specialties */
    user_specialties = [];
    row[SPECIALTIES].split(',').forEach(s => {
        specialty_id = 0;
        if (specialties.hasOwnProperty(s)) {
            specialty = specialties[s];
            specialty_id = specialty.id;
        } else {
            specialty_id = specialties_length++;
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

    volunteers.push({
        full_name: row[FULL_NAME],
        email: rpw[EMAIL],
        phone: row[PHONE],
        facebook_profile_url: row[FACEBOOK_PROFILE_URL],
        city: row[CITY],
        available_hours_per_week: row[HOURS_PER_WEEK] == null? Number(row[HOURS_PER_WEEK]): 0,
        notes: row[COMMENTS],
        specialties: user_specialties,
        projects: [],
    })
})
.on('end', function (data) {
    console.log('No more rows!');
    fs.writeFileSync("specialties.json", JSON.stringify(Object.values(specialties), null, 2));
    fs.writeFileSync("volunteers.json", JSON.stringify(volunteers, null, 2));
});