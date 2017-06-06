import pickle; import json; import csv


def read_json(fname, encoder):
    with open(fname, encoding=encoder) as data_file:
        json_data = json.load(data_file)
    return json_data


def save_json(data, fname, encoder):
    with open(fname, "w", encoding=encoder) as jsonfile:
        #뻑나지 않게 하기
        json.dump(data, jsonfile, ensure_ascii=False)


def read_pickle(fname):
    with open(fname, 'rb') as loadData:
        pickle_data = pickle.load(loadData)

    return pickle_data

def read_txt(fname):
    with open(fname, 'r') as f:
        data = f
        
    return data

def read_csv(fname):
    # _csv.Error: iterator should return strings, not bytes (did you open the file in text mode?)
    # rt혹은 r로 해야함(rb로 하면 안되고)
    with open(fname, 'rt') as f: # csv는 바이너리로만 읽힘 -> rb,wb이런식으로 써야함
        reader = csv.reader(f, delimiter = ":")

    return reader

def write_csv(fname):
    with open(fname,'w') as file:
        w = csv.writer(file)
        """
        바뀔 부분
        for name, num in a.items():
            w.writerow([name, num])
            
        """
    
    return 0
