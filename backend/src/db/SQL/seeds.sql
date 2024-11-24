-- Inserir motoristas com suas descrições
INSERT INTO `customers` (`id`) VALUES (NULL), (NULL);

INSERT INTO
    `drivers` (
        `name`,
        `vehicle`,
        `rating`,
        `tax`,
        `min_order`,
        `description`
    )
VALUES (
        'Homer Simpson',
        'Plymouth Valiant 1973 rosa e enferrujado',
        2.0,
        2.50,
        1,
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).'
    ),
    (
        'Dominic Toretto',
        'Dodge Charger R/T 1970 modificado',
        4.0,
        5.00,
        5,
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.'
    ),
    (
        'James Bond',
        'Aston Martin DB5 clássico',
        5.0,
        10.00,
        10,
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.'
    );