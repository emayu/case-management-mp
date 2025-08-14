-- USE THIS IN DEV ENV
TRUNCATE table log_asignacion_casos;
delete from casos where id not in ('A888112F-0000-4FEE-8A4C-DD8A1F38C6AC', 'A888112F-5CC5-4FEE-8A4C-DD8A1F38C6AC');
update casos set usuario_asignado_id = null, estado = 'pendiente' where id = 'A888112F-5CC5-4FEE-8A4C-DD8A1F38C6AC';
