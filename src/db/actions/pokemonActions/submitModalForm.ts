'use server';

export async function submitModalForm(formData: FormData) {
  const pokemonFormData = {
    id: formData.get('pokemon-id')!,
    nature: formData.get('nature'),
    notes: formData.get('notes'),
    caught: formData.get('caught'),
  };
}
