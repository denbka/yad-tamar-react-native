import React, { FC, useEffect, useMemo, useState } from 'react'
import DatePickerNative from 'react-native-date-picker'
import { DateTime } from 'luxon'
import { useTheme } from '@react-navigation/native'
import { createStyles } from '../todo_create.styles'
import { Pressable, Text, View } from 'react-native'
import { useLocale } from '@hooks'

export const DatePicker: FC<DatePickerProps> = ({ date, onChange }) => {
  const { strings } = useLocale()
  const prompts = useMemo(() => [strings.no_time, strings.exact_time, strings.until], [strings])
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const theme = useTheme()
  const styles = createStyles(theme)

  const parsedDate = useMemo(() => {
    const dt = DateTime.fromJSDate(date)
    if (!dt) return
    return {
      time: dt.toLocaleString(DateTime.TIME_SIMPLE),
      date: dt.toLocaleString(DateTime.DATE_MED),
    }
  }, [date])

  return (
    <View style={styles.datepicker_container}>
      <Pressable onPress={() => setOpenDatePicker(true)}>
        <View style={styles.datepicker}>
          {!parsedDate ? (
            <Text>dsadsa</Text>
          ) : (
            <>
              <Text style={styles.datepicker_item}>{parsedDate.time}</Text>
              <Text style={styles.datepicker_item}>{parsedDate.date}</Text>
            </>
          )}
        </View>
      </Pressable>
      <View style={styles.datepicker_prompts}>
        {prompts.map((prompt, index) => (
          <View
            style={[
              styles.datepicker_prompts_item_container,
              index === prompts.length - 1 && styles.datepicker_prompts_item_container_last,
            ]}
          >
            <Text style={styles.datepicker_prompts_item}>{prompt}</Text>
          </View>
        ))}
      </View>
      <DatePickerNative
        modal
        open={openDatePicker}
        date={date}
        onConfirm={(date) => {
          date
          setOpenDatePicker(false)
          onChange(date)
        }}
        onCancel={() => {
          setOpenDatePicker(false)
        }}
      />
    </View>
  )
}

type DatePickerProps = {
  date: Date
  onChange: (date: Date) => void
}
