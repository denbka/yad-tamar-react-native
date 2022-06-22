import React, { FC, useMemo, useState } from 'react'
import DatePickerNative from 'react-native-date-picker'
import { DateTime } from 'luxon'
import { useTheme } from '@react-navigation/native'
import { createStyles } from '../todo_create.styles'
import { Pressable, Text, View } from 'react-native'
import { useLocale } from '@hooks'
import Animated from 'react-native-reanimated'

export const DatePicker: FC<DatePickerProps> = ({ date, onChange }) => {
  const { strings } = useLocale()
  const prompts = useMemo(() => [strings.no_time, strings.exact_time, strings.until], [strings])
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const theme = useTheme()
  const styles = createStyles(theme)
  const [activeType, setActiveType] = useState(strings.exact_time)

  const parsedDate = useMemo(() => {
    if (!date) return null
    const dt = DateTime.fromJSDate(date)
    if (!dt) return
    return {
      time: dt.toLocaleString(DateTime.TIME_SIMPLE),
      date: dt.toLocaleString(DateTime.DATE_MED),
    }
  }, [date])

  const handleChangeActiveType = (type: string) => {
    setActiveType(type)
  }

  return (
    <View style={styles.datepicker_container}>
      <Pressable onPress={() => setOpenDatePicker(true)}>
        {activeType !== strings.no_time && (
          <View style={styles.datepicker}>
            <Text style={styles.datepicker_item}>{parsedDate?.time}</Text>
            <Text style={styles.datepicker_item}>{parsedDate?.date}</Text>
          </View>
        )}
      </Pressable>
      <View style={styles.datepicker_prompts}>
        {prompts.map((prompt, index) => (
          <Pressable
            key={prompt}
            style={[
              styles.datepicker_prompts_item_container,
              index === prompts.length - 1 && styles.datepicker_prompts_item_container_last,
              prompt === activeType ? styles.active_datepicker_type : null,
            ]}
            onPress={() => handleChangeActiveType(prompt)}
          >
            <Animated.View>
              <Text style={styles.datepicker_prompts_item}>{prompt}</Text>
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
  onChange: (date: Date) => void
}
