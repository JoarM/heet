import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
  
interface EmailConfirmationProps {
    key: string
}
  
export const EmailConfirmation = ({
    key,
}: EmailConfirmationProps) => {  
    return (
        <Html>
            <Preview>Rizz GPT email confirmation</Preview>
            <Tailwind>
                <head></head>
                <Body className={`${inter.className} p-4 md:p-10 bg-[#ffffff] text-[#0a0a0a] dark:bg-[#0a0a0a] dark:text-[#fafafa]`}>
                    <Container className="mx-auto max-w-[465px]">
                        <Text className="text-lg font-bold text-[#0a0a0a]">Rizz GPT</Text>
                        <Section className="text-center space-y-2">
                            <Heading className="text-3xl font-bold text-[#0a0a0a]">Email Confirmation</Heading>
                            <Text className="text-[#737373] dark:text-[#a3a3a3]">Thank you for signing up! We have successfully registered your email address.</Text>
                        </Section>
                        <Section className="mt-3 mx-auto text-xl py-3 bg-[#a3a3a3] dark:bg-[#737373] text-[#ffffff] flex items-center justify-center px-5 rounded-md w-fit">
                            <Text className="inline text-xl">{key.split("")[0]}</Text>
                            {key.split("").splice(1).map((char) => <Text className="inline text-xl ml-4 first:ml-0">{char}</Text>)}
                        </Section>
                        <Text className="text-[#737373] dark:text-[#a3a3a3] mt-8 text-center text-sm">
                            If you did not sign up for an account, you can safely ignore this email. You can contact us at helprizzgpt@gmail.com.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default EmailConfirmation;