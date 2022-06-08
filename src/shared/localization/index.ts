import LocalizedStrings from 'react-native-localization'

export const localStrings = new LocalizedStrings({
  ru: {
    email: 'e-mail',
    password: 'password',
    login: 'login',
    create_family: 'Create family',
    welcome_text: 'Welcome to',
    my_families: 'My families',
    members_count: 'members',
    name_the_family: 'Name the family',
    prompt_the_family: 'for example: Smith',
    phone_number: 'Phone number',
    volunteers: 'Volunteers',
    add_volunteer: 'Add volunteer',
    create: 'Create',
    week: 'Week',
    todo_list: 'To do list',
    completed: 'completed',
    create_task: 'Create task',
    my_volunteers: 'My volunteers',
    name: 'Name',
    modal_add_volunteer: 'Add a new volunteer',
    add_contacts: 'Choose from contact list',
    name_the_task: 'Name the task...',
    time: 'Time',
    details: 'Details',
    details_placeholder: 'Start typing here...',
    no_time: 'no time',
    exact_time: 'exact time',
    until: 'until',
    create_new_task: 'Create a new task',
  },
  il: {
    email: 'אימייל',
    password: 'סיסמה',
    login: 'התחברות',
    create_family: 'צור משפחה',
    welcome_text: 'ברוכים הבאים ל',
    my_families: 'המשפחות שלי',
    members_count: 'חברים',
    name_the_family: 'בחירת שם משפחה...',
    prompt_the_family: 'למשל: סמית',
    phone_number: 'מספר טלפון',
    volunteers: 'מתנדבים',
    add_volunteer: 'הוסף מתנדב',
    create: 'צור משפחה',
    week: 'השבוע',
    todo_list: 'רשימת מטלות',
    completed: 'רשימת מטלות',
    create_task: 'דני יבצע',
    my_volunteers: 'המתנדבים שלי',
    name: 'שם',
    modal_add_volunteer: 'הוספת מתנדב חדש',
    add_contacts: 'בחר מרשימת אנשי קשר',
    name_the_task: 'שם המטלה…',
    time: 'זמן',
    details: 'פרטים',
    details_placeholder: 'הקלד כאן...',
    no_time: 'ללא ציון זמן',
    exact_time: 'זמן מדויק',
    until: 'עד לתאריך',
    create_new_task: 'כהן',
  },
})

// ? Set the language manually
localStrings.setLanguage('il')
