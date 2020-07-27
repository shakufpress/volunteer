<template>
  <q-page align="center">
    <div class="q-pa-md" dir="rtl">
      <p>
תודה שנרשמת להתנדבות אצלנו ב"שקוף"!<br><br>

הקמנו מערכת מיוחדת לניהול משימות התנדבות - איך זה עובד?<br>
נכנסים למערכת כדי לצפות בכל <q-btn padding="none" color="secondary" to="/tasks_dashboard" label="המשימות הפתוחות" /> <br>
במקביל, אחת לשבוע ישלח מייל מסכם עם המשימות החדשות של השבוע. <br>
במידה ותרצו להצטרף לאחת מהן, פשוט הירשמו למשימה במערכת.<br>
לאחר ההרשמה, יש להמתין למייל אישור ממוביל המשימה. <br>
המייל יסמל שנכנסתם למשימה ואתם יכולים להתחיל אותה. <br><br>

תודה ענקית, ואנחנו מקווים שנזכה לעבוד יחדיו ממש בקרוב.
      </p>
    </div>
    <div class="q-pa-md fixed-bottom-right">
      Developed by <a href="https://github.com/Malkiz">
        <q-avatar square size="md">
          <img src="https://avatars1.githubusercontent.com/u/3840566" alt="@Malkiz" />
        </q-avatar>
        @Malkiz
      </a>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAbout'
}
</script>
