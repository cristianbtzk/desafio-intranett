import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('teams')
class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

export default Team;
