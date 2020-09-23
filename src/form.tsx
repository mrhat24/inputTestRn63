import {View, Text, Button, TextInput} from 'react-native';
import React, {useCallback} from 'react';
import {Field, Form} from 'react-final-form';
import {FormApi, SubmissionErrors} from 'final-form';

interface IFormProps {
  onSubmit: (
    values: any,
    form: FormApi<any, any>,
    callback?: (errors?: SubmissionErrors) => void,
  ) =>
    | SubmissionErrors
    | Promise<SubmissionErrors | undefined>
    | undefined
    | void;
}

const FormWrapper = ({onSubmit}: IFormProps) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({handleSubmit}) => (
        <View>
          <Field name="FieldName" placeholder="your placeholder">
            {({input, meta}) => {
              return (
                <View>
                  <TextInput
                    value={input.value}
                    onChangeText={input.onChange}
                  />
                  <Text>{meta.error}</Text>
                </View>
              );
            }}
          </Field>
          <Button color="info" title={'Submit'} onPress={handleSubmit} />
        </View>
      )}
    />
  );
};

export const TestForm = () => {
  const onSubmit = useCallback((values, form) => {
    console.log(values);
    console.log(form);
    console.log(values);
  }, []);
  return <FormWrapper onSubmit={onSubmit} />;
};
