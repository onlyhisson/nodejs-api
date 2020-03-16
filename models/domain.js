module.exports = (sequelize, DataTypes) => (
  // varchar  => STRING
  // int      => INTEGER
  // tinyint  => BOOLEAN
  // datetime => DATE

  // 테이블 명과 컬럼 스펙 입력
  // 첫번째 인자(여기서는 domain)를 복수형(domains)으로 만들어 테이블 이름으로 사용
  sequelize.define('domain', {
    host: {   // 인터넷 주소
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    type: {   // 도메인 종류
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    clientSecret: { // 클라이언트 비밀키
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  }, {  // 3rd element, table option
    validate: {
      unknownType() { // 데이터 검증
        console.log(this.type, this.type !== 'free', this.type !== 'premium');
        if (this.type !== 'free' && this.type !== 'premium') {
          throw new Error('type 컬럼은 free나 premium이어야 합니다.');
        }
      },
    },
    timestamps: true,   // true 시 createdAt, updatedAt 컬럼추가, 자동 입력된다.
    paranoid: true,     // true 시 deletedAt 컬럼추가, 자동 입력된다. timestamps: true여야 한다. 실제 삭제되지 않으나 find() 시 제외된다.
    // underscored      // ex createdAt => created_at
    // freezeTableName  // 첫번째 인자(여기서는 domain)를 복수형으로 만들어 테이블 이름으로 사용하지 않는다.
    // tableName        // 테이블 이름 설정
    // comment          // 테이블 주석
  })
);
  