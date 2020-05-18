import csv

FULL_NAME = 1 #"שם מלא"
EMAIL = 2 # "אימייל"
PHONE = 3 # "טלפון"
FACEBOOK_URL = 4 # "קישור לפרופיל פייסבוק"
CITY = 5 # "עיר מגורים"
HOURS_PER_WEEK = 6 # "שעות פנויות בשבוע"
SPECIALTIES = 7 # "תחומי עניין / מומחיות"
COMMENTS = 8 # "ספר/י לנו עלייך או כל הערה רלוונטית"



with open('data.tsv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter='\t')
    line_count = 0
    specialties = {}
    volunteers = {}
    for row in csv_reader:
        if line_count == 1:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            vol = {}
            vol['full_name'] = 'פלוני אלמוני'
            vol['']
            volunteers[line_count] = vol

    print(f'Processed {line_count} lines.')