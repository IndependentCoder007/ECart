import * as React from 'react';
import { Button, Dialog, Portal,Text } from 'react-native-paper';

export default function DialogComponent({onDismiss,isDialogVisible,message="",dailogButtons=[],dialogTitle="Alert"}) {

  return (
    <Portal>
          <Dialog visible={isDialogVisible} onDismiss={onDismiss}>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
            {
                dailogButtons.map((item)=><Button key={item.title} onPress={item.onPress}>D{item.title}</Button>)
            }
            </Dialog.Actions>
          </Dialog>
    </Portal>
  )
}