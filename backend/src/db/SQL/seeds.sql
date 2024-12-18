-- Inserir motoristas com suas descrições
INSERT INTO `customers` (`id`) VALUES (NULL), (NULL);

INSERT INTO
    drivers (
        name,
        description,
        vehicle,
        tax,
        min_order
    )
VALUES (
        'Homer Simpson',
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        'Plymouth Valiant 1973 rosa e enferrujado',
        2.50,
        1
    ),
    (
        'Dominic Toretto',
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        'Dodge Charger R/T 1970 modificado',
        5.00,
        5
    ),
    (
        'James Bond',
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        'Aston Martin DB5 clássico',
        10.00,
        10
    );

INSERT INTO
    rides (
        driver_id,
        customer_id,
        origin,
        destination,
        duration,
        distance,
        value
    )
VALUES (
        1,
        1,
        'Springfield',
        'Central Park',
        '1350s',
        10.0,
        25.00
    ),
    (
        2,
        2,
        'Los Angeles',
        'Toretto\'s Garage',
        '1000s',
        15.0,
        75.00
    ),
    (
        3,
        1,
        'London',
        'MI6 Headquarters',
        '900s',
        5.0,
        50.00
    );

INSERT INTO
    reviews (
        ride_id,
        driver_id,
        customer_id,
        rating,
        comment
    )
VALUES (
        1,
        1,
        1,
        2,
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.'
    ),
    (
        2,
        2,
        2,
        4,
        'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!'
    ),
    (
        3,
        3,
        1,
        5,
        'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.'
    );