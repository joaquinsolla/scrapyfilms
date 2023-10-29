# EXECUTION:
# cd scrapyfilms\scrapyfilms
# python .\json_to_postman_formatter.py

def eliminar_comas_entre_objetos():
    input_file_path = '../dumps/films.json'
    output_file_path = '../dumps/films-FORMATTED.json'

    try:
        with open(input_file_path, 'r', encoding='utf-8') as file_in:
            data = file_in.read()

        # Reemplazar todas las apariciones de "}," por "}"
        data = data.replace('[\n', '')
        data = data.replace('},', '}')
        data = data.replace('\n]', '')

        with open(output_file_path, 'w', encoding='utf-8') as file_out:
            file_out.write(data)

        print(f"ARCHIVO {output_file_path} CREADO.")
    except Exception as e:
        print(f"ERROR CREANDO EL ARCHIVO FORMATEADO: {e}")

eliminar_comas_entre_objetos()