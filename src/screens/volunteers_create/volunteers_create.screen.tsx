import React, { useMemo, useRef, useState } from 'react'
import { PermissionsAndroid, ScrollView, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as NavigationService from 'react-navigation-helpers'
import { Formik } from 'formik'
import Contacts from 'react-native-contacts'
import { Picker } from '@react-native-picker/picker'
import { TextInput } from '@shared-components/text_input'
import { Button } from '@shared-components/button'
import { useMutation, useQueryClient } from 'react-query'
import { familyApi, volunteerApi } from '@api'
import { Text } from '@shared-components/text'
import { createStyles } from './volunteers_create.styles'
import { Modal } from '@shared-components/modal'
import { useLocale } from '@hooks'
import { SCREENS } from '@shared-constants'

interface VolunteersCreateScreenProps {}

export const VolunteersCreateScreen: React.FC<VolunteersCreateScreenProps> = ({ route }) => {
  const family_id = route.params.family_id
  console.log('family_di', family_id)
  const { strings } = useLocale()
  const queryClient = useQueryClient()
  //  const { data } = useQuery<IFamily[]>(queryKey, familyApi.get)
  const { mutate: addVolunteer, isLoading } = useMutation(volunteerApi.post)
  const [contacts, setContacts] = useState<IContact[]>([])
  const theme = useTheme()
  const styles = createStyles(theme)
  const [initialValues, setInitialValues] = useState<IVolunteer>({ name: '', phone: '', family_id })

  const pickerRef = useRef()

  const openContactList = () => {
    pickerRef.current?.focus()
  }

  const chooseFromContacts = async ({ name_of_family }: Pick<IFamily, 'name_of_family'>) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(() => {
      Contacts.getAll()
        .then((contacts) => {
          setContacts(
            contacts.map((contact) => ({
              label: contact?.displayName ?? null,
              value: contact?.phoneNumbers?.find((item) => item.number)?.number ?? null,
            })),
          )
          openContactList()
        })
        .catch((e) => {
          console.log('error contacts, ', e)
        })
    })
  }

  const handleSubmit = (values: IVolunteer) => {
    console.log(values)
    addVolunteer(values, {
      onSuccess: () => {
        queryClient.invalidateQueries(volunteerApi.queryKey)
        NavigationService.goBack()
      },
      onError: (error) => {
        console.log(error.response.status, 'its error')
      },
    })
  }

  const handleCloseForm = () => {
    NavigationService.goBack()
  }

  const setSelectedContact = (contact: IContact) => {
    console.log(contact)
    setInitialValues({ name: contact.label, phone: contact?.value })
  }
  return (
    <Modal onClose={handleCloseForm} style={{ minHeight: 500 }}>
      <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <Text style={styles.title} bold>
              {strings.modal_add_volunteer}
            </Text>
            <View style={styles.body}>
              <Text style={styles.input_title}>{strings.name}</Text>
              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={styles.input}
                placeholderTextColor="#fff"
              />
              <Text style={styles.input_title}>{strings.phone_number}</Text>
              <TextInput
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                style={styles.input}
                placeholderTextColor="#fff"
              />

              <Button loading={isLoading} style={styles.button_create} onPress={handleSubmit} variant="green">
                {strings.create}
              </Button>
              <Button loading={isLoading} style={styles.button_create} onPress={chooseFromContacts} variant="green">
                {strings.add_contacts}
              </Button>
              {/* <DeleteIcon /> */}
            </View>
            <Picker ref={pickerRef} selectedValue={null} onValueChange={(contact) => setSelectedContact(contact)}>
              {contacts.map((contact) => (
                <Picker.Item label={contact.label} value={contact} />
              ))}
            </Picker>
          </View>
        )}
      </Formik>
    </Modal>
  )
}

type IContact = {
  value: string | null
  label: string
}
