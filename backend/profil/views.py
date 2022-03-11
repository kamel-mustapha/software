from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.conf import settings
from datetime import datetime
import os
import json
import cryptocode
import uuid


def index(req):
    try:
        with open(os.path.join(settings.BASE_DIR, 'secret.json'), "r") as f:
            user_data = json.load(f)
            public_key = cryptocode.decrypt(user_data.get('key'), 'JamesCurryx96')
            private_key = cryptocode.decrypt(user_data.get('public'), 'JamesCurryx96')
            if 'musXcurry' in public_key and hex(uuid.getnode()) == private_key:
                if 'TRIAL' in public_key:
                    public_list = public_key.split('musXcurry')
                    if datetime.now() > datetime.fromtimestamp(float(public_list[0])):
                        return render(req, 'activation.html')
                return render(req, 'index.html')
    except:
        pass
    return render(req, 'activation.html')
    
def activation(req):
    res = {'status':'error'}
    try:
        if req.method == 'POST':
            data = json.loads(req.body)
            private_key = cryptocode.decrypt(data.get('key'), 'JamesCurryx96')
            if 'musXcurry' in private_key :
                res['status'] = 'success'
                data = {'key':data.get('key'), 'public': cryptocode.encrypt(hex(uuid.getnode()), 'JamesCurryx96')}
                with open(os.path.join(settings.BASE_DIR, 'secret.json'), "w") as f:
                    json.dump(data, f)
            else:
                res['status'] = "error"
    except:
        pass
    return JsonResponse(res)

def check_server(req):
    return HttpResponse('ok')