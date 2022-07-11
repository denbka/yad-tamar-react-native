import React, { FC, useMemo, useState } from 'react'
import DatePickerNative from 'react-native-date-picker'
import { DateTime } from 'luxon'
import { useTheme } from '@react-navigation/native'
import { createStyles } from '../todo_create.styles'
import { Pressable, Text, View } from 'react-native'
import { useLocale } from '@hooks'
import Animated from 'react-native-reanimated'

export const DatePicker: FC<DatePickerProps> = ({ date, activeType, onChange, onChangeType }) => {
  const { strings, currentLocale } = useLocale()
  const prompts = useMemo(
    () => [
      { key: 'no_time', label: strings.no_time },
      { key: 'exact_time', label: strings.exact_time },
      { key: 'until', label: strings.until },
    ],
    [strings],
  )
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const theme = useTheme()
  const styles = createStyles(theme)

  const parsedDate = useMemo(() => {
    if (!date) return null
    const dt = DateTime.fromJSDate(date)
    if (!dt) return
    return {
      time: dt.setLocale(currentLocale).toLocaleString(DateTime.TIME_SIMPLE),
      date: dt.setLocale(currentLocale).toLocaleString(DateTime.DATE_MED),
    }
  }, [date])

  const handleChangeActiveType = (type: string) => {
    onChangeType(type)
  }

  return (
    <View style={styles.datepicker_container}>
      <Pressable onPress={() => setOpenDatePicker(true)}>
        {activeType !== 'no_time' && (
          <View style={styles.datepicker}>
            <Text style={styles.datepicker_item}>{parsedDate?.time}</Text>
            <Text style={styles.datepicker_item}>{parsedDate?.date}</Text>
          </View>
        )}
      </Pressable>
      <View style={styles.datepicker_prompts}>
        {prompts.map((prompt, index) => (
          <Pressable
            key={prompt.key}
            style={[
              styles.datepicker_prompts_item_container,
              index === prompts.length - 1 && styles.datepicker_prompts_item_container_last,
              prompt.key === activeType ? styles.active_datepicker_type : null,
            ]}
            onPress={() => handleChangeActiveType(prompt.key)}
          >
            <Animated.View>
              <Text style={styles.datepicker_prompts_item}>{prompt.label}</Text>
            </Animated.View>
          </Pressable>
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
  activeType: string
  onChange: (date: Date) => void
  onChangeType: (type: string) => void
}
