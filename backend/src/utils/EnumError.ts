export enum StatusCodeBackend {
    'INVALID_DATA' = 400,
    'DRIVER_NOT_FOUND' = 404,
    'INVALID_DISTANCE' = 406,
    'SUCCESS' = 200,
    'INVALID_DRIVER' = 400,
    'NO_RIDES_FOUND' = 404,
    'INTERNAL_SERVER_ERROR' = 500,
    'GOOGLE_API_ERROR' = 404,
    'CREATION_FAILED' = 400,
    'NO_DRIVERS_FOUND' = 404,
}

export enum MapMessage {
    'INVALID_DATA' = 'Os dados fornecidos no corpo da requisição são inválidos',
    'DRIVER_NOT_FOUND' = 'Motorista não encontrado',
    'INVALID_DISTANCE' = 'Quilometragem inválida para o motorista',
    'SUCCESS' = 'Operação realizada com sucesso',
    'INVALID_DRIVER' = 'Motorista inválido',
    'NO_RIDES_FOUND' = 'Nenhum registro encontrado',
    'INTERNAL_SERVER_ERROR' = 'Erro interno do servidor',
    'GOOGLE_API_ERROR' = 'Erro na API do Google',
    'CREATION_FAILED' = 'Falha ao criar registro',
    'NO_DRIVERS_FOUND' = 'Nenhum motorista disponivel encontrado',
}