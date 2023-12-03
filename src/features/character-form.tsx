import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Character } from "@/api/characters";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type CharacterFormProps = {
  character: Character;
  onSubmit: (data: z.infer<typeof formSchema>) => any;
};

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name should be at least 3 characters long",
  }),
  birth_year: z.string(),
  height: z.string().regex(/^\d+$/).transform(Number),
  eye_color: z.string(),
  gender: z.string(),
});

export function CharacterForm(props: CharacterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.character,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Character's name</FormLabel>

              <FormControl>
                <Input placeholder={props.character.name} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Character's birth year</FormLabel>

              <FormControl>
                <Input placeholder={props.character.birth_year} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Character's height</FormLabel>

              <FormControl>
                <Input
                  placeholder={props.character.height.toString()}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eye_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Character's eye color</FormLabel>

              <FormControl>
                <Input placeholder={props.character.eye_color} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Character's gender</FormLabel>

              <FormControl>
                <Input placeholder={props.character.gender} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
