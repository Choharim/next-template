import React, { useState } from 'react'

import Form, { FormData } from '@/components/Form'
import Label from '@/components/Form/Label'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { css } from '@emotion/css'
import Text from '@/components/Text'
import SearchInput from '@/components/Input/SearchInput'

const CONTORLL_INPUT_ID = 'controllInput'

const FORM_FIELD_NAMES = [CONTORLL_INPUT_ID] as const

const ControlledInput = () => {
  const [value, setValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const submitControllForm = (target: FormData<typeof FORM_FIELD_NAMES>) => {
    console.log(target)
  }

  const enterSubmit = (target: string) => {
    console.log(target)
  }

  return (
    <>
      <Form onSubmit={submitControllForm} fieldNames={FORM_FIELD_NAMES}>
        <Label htmlFor={CONTORLL_INPUT_ID}>폼 입력 창</Label>
        <Input
          id={CONTORLL_INPUT_ID}
          name={CONTORLL_INPUT_ID}
          setValue={setValue}
          value={value}
        />

        <Button type="submit" variety="contain" className={ConfirmButtonStyle}>
          확인
        </Button>
      </Form>

      <SearchInput
        onEnterSubmit={enterSubmit}
        setValue={setSearchValue}
        value={searchValue}
      >
        {({ onSubmit }) => (
          <Button
            variety="contain"
            className={SearchButtonStyle}
            onClick={onSubmit}
          >
            <Text color="inherit" variety="body_4">
              검색
            </Text>
          </Button>
        )}
      </SearchInput>
    </>
  )
}

export default ControlledInput

const SearchButtonStyle = css`
  padding: 0 10px;
  width: fit-content;
  white-space: nowrap;
  height: 100%;
`

const ConfirmButtonStyle = css`
  margin-top: 10px;
`