import json
import os

def check_duplicate_lines():
    input_file_path = '../dumps/films.json'

    try:
        with open(input_file_path, 'r', encoding='utf-8') as file:
            data = file.readlines()
            seen_lines = set()
            duplicates = []

            for line in data:
                if line in seen_lines:
                    duplicates.append(line)
                else:
                    seen_lines.add(line)

            if duplicates:
                print("[ERR] Líneas duplicadas encontradas:")
                for line in duplicates:
                    print(line.strip())
            else:
                print("[OK] No existen lineas duplicadas.")
                delete_format_errors()

    except FileNotFoundError:
        print(f"[ERR] El archivo {input_file_path} no fue encontrado.")

def delete_format_errors():
    input_file_path = '../dumps/films.json'
    output_file_path = '../dumps/films_temp_1.json'

    with open(input_file_path, 'r', encoding='utf-8') as infile:
        data = json.load(infile)

    filtered_data = [item for item in data if "release_date" not in item or item["release_date"] != "NA"]

    with open(output_file_path, 'w', encoding='utf-8') as outfile:
        json.dump(filtered_data, outfile)

    print(f"[OK] Eliminadas lineas con error de formato (NA).")
    add_ids()

def add_ids():
    input_file_path = '../dumps/films_temp_1.json'
    output_file_path = '../dumps/films_temp_2.json'

    count = 1

    with open(input_file_path, 'r', encoding='utf-8') as infile, open(output_file_path, 'w') as outfile:
        data = json.load(infile)

        for item in data:
            create_id = {"create": {"_id": count}}
            item_str = json.dumps(create_id) + '\n'
            outfile.write(item_str)

            item_str = json.dumps(item) + '\n'
            outfile.write(item_str)

            count += 1

    print(f"[OK] Añadidos campos _id.")
    format_json()

def format_json():
    input_file_path = '../dumps/films_temp_2.json'
    output_file_path = '../dumps/films_formatted.json'

    try:
        with open(input_file_path, 'r', encoding='utf-8') as file_in:
            data = file_in.read()

        data = data.replace('[\n', '')
        data = data.replace('},', '}')
        data = data.replace('\n]', '')

        with open(output_file_path, 'w', encoding='utf-8') as file_out:
            file_out.write(data)

        print(f"[OK] Archivo formateado creado: {output_file_path}")
    except Exception as e:
        print(f"[ERR] No se pudo formatear el archivo JSON: {e}.")

    if os.path.exists('../dumps/films_temp_1.json') and os.path.exists('../dumps/films_temp_2.json'):
        os.remove('../dumps/films_temp_1.json')
        os.remove('../dumps/films_temp_2.json')
        print(f"[OK] Archivos temporales eliminados.")
    else:
        print(f"[ERR] Error limpiando los archivos temporales.")

if __name__ == "__main__":
    check_duplicate_lines()

