import { Modal, Button, TextInput, PasswordInput, Stack } from '@mantine/core';


type AuthModalProps = {
  opened: boolean;
  close: () => void;
  open: () => void;
}


export default function AuthModal({
  opened,
  close,
}: AuthModalProps) {

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {/* Modal content */}

        <Stack >

          <TextInput label="Your name" placeholder="Your name" size="md" />
          <TextInput label="Email" placeholder="Email"  size="md" />

          <PasswordInput
            label="New Password"
            // description="Input description"
            placeholder="Include symbols, Numbers, Letters"
            size="md"
          />

          <PasswordInput
            label="Confirm Password"
            // description="Input description"
            placeholder="Include symbols, Numbers, Letters"
            size="md"
          />

          <Button>
              Register
          </Button>

        </Stack>
      </Modal>

    </>
  );
}